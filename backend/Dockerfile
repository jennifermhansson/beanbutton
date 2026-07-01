FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY BeanButton.Api/BeanButton.Api.csproj BeanButton.Api/
RUN dotnet restore BeanButton.Api/BeanButton.Api.csproj
COPY . .
RUN dotnet publish BeanButton.Api/BeanButton.Api.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 5000
ENTRYPOINT ["dotnet", "BeanButton.Api.dll"]
