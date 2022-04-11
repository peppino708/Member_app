CarrierWave.configure do |config|
  config.asset_host = "https://murmuring-earth-47067.herokuapp.com"
  config.storage = :file
  config.cache_storage = :file
end