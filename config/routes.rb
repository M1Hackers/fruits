Rails.application.routes.draw do
  get 'home/index'

  resources :itineraries

  root 'home#index'
end
