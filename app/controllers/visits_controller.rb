class VisitsController < ApplicationController
    def create
        logger.debug params
        logger.debug params["itinerary_id"]
        @itinerary = Itinerary.find(params[:visit][:itinerary_id])
        @visit = Visit.new(visit_params)
        @visit.save
    end

    private
        def visit_params
            params.require(:visit).permit(:name, :latitude, :longitude, :rating, :start, :end, :itinerary_id)
        end
end
