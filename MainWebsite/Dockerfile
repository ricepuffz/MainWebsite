#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:3.1-focal-arm64v8 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:3.1-focal-arm64v8 AS build
WORKDIR /src
COPY ["MainWebsite/MainWebsite.csproj", "MainWebsite/"]
RUN dotnet restore "MainWebsite/MainWebsite.csproj" -r linux-arm64
COPY . .
WORKDIR "/src/MainWebsite"
RUN dotnet build "MainWebsite.csproj" -c Release -o /app/build -r linux-arm64

FROM build AS publish
RUN dotnet publish "MainWebsite.csproj" -c Release -o /app/publish -r linux-arm64

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MainWebsite.dll"]