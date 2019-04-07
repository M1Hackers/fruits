class VisitsController < ApplicationController
    wrap_parameters format: [:json, :xml]

    def create
        @itinerary = Itinerary.find(params[:visit][:itinerary_id])
        @visit = Visit.new(visit_params)
        @visit.save
    end

    private
        def visit_params
            params.require(:visit).permit(:name, :latitude, :longitude, :rating, :day, :start, :end, :itinerary_id)
        end
end
