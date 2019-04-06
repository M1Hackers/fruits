class VisitsController < ApplicationController
    def create
        @itinerary = Itinerary.find(params[:itinerary_id])
        @visit = Visit.new(visit_params)
        @visit.save
    end

    private
        def visit_params
            params.require(:visit).permit(:name, :latitude, :longitude, :rating, :start, :end)
        end
end
