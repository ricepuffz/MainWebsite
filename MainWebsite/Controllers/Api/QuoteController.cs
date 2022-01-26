using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace MainWebsite.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuoteController : ControllerBase
    {
        [HttpGet]
        [Route("retrievequote")]
        public ActionResult<List<string>> RetrieveQuote()
        {
            List<string> result = new List<string>();

            WebClient client = new WebClient();
            client.Headers.Add("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.2; .NET CLR 1.0.3705;)");

            Stream data = client.OpenRead("https://inspirobot.me/api?generateFlow=1");
            StreamReader reader = new StreamReader(data);
            string jsonString = reader.ReadToEnd();
            reader.Close();
            data.Close();

            JArray array = JObject.Parse(jsonString).Value<JArray>("data");
            foreach (JObject obj in array)
            {
                string quoteFragment = obj.Value<string>("text");
                if (quoteFragment != null)
                {
                    result.Add(quoteFragment);
                }
            }

            result = SanitizeQuote(result);
            return result;
        }

        private static List<string> SanitizeQuote(List<string> source)
        {
            List<string> result = new List<string>();

            for (int i = 0; i < source.Count; i++)
            {
                string fragment = source[i];

                while (fragment.Contains('['))
                {
                    int openingIndex = fragment.IndexOf('[');
                    int closingIndex = fragment.IndexOf(']');
                    fragment = fragment.Substring(0, openingIndex) + fragment.Substring(closingIndex + 1, fragment.Length - closingIndex - 1);
                }

                result.Add(fragment);
            }

            return result;
        }
    }
}
