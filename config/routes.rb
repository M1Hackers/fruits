Rails.application.routes.draw do
  get 'home/index'

  resources :itineraries, :visits

  root 'home#index'
end
