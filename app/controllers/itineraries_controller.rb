class ItinerariesController < ApplicationController
    def create
        @itinerary = Itinerary.new(itinerary_params)
        @itinerary.save
        redirect_to @itinerary
    end

    def new
        
    end

    def show
        @itinerary = Itinerary.find(params[:id])
        @visits = @itinerary.visits.all
    end

    private
        def itinerary_params
            params.require(:itinerary).permit(:name)
        end
end
