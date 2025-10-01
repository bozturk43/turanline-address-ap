
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["AddressApp.Api.csproj", "."]
RUN dotnet restore "./AddressApp.Api.csproj"
COPY . .
RUN dotnet build "AddressApp.Api.csproj" -c Release -o /app/build

RUN dotnet publish "AddressApp.Api.csproj" -c Release -o /app/publish


FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "AddressApp.Api.dll"]