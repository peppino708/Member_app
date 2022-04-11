CarrierWave.configure do |config|
  config.asset_host = "http://localhost:3000", "https://murmuring-earth-47067.herokuapp.com/api"
  config.storage = :file
  config.cache_storage = :file
end