CarrierWave.configure do |config|
  if Rails.env.production?
    config.asset_host = "https://murmuring-earth-47067.herokuapp.com"
    config.storage = :file
    config.cache_storage = :file
  else
    config.asset_host = "http://localhost:3000"
    config.storage = :file
    config.cache_storage = :file
  end
end