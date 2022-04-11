Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "localhost:3001", "https://murmuring-earth-47067.herokuapp.com/api"

    resource "*",
      headers: :any,
      expose: ["access-token", "expiry", "token-type", "uid", "client"],
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end