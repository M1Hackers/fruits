class ItinerariesController < ApplicationController
    def create
        @itinerary = Itinerary.new(itinerary_params)
        @itinerary.save
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
