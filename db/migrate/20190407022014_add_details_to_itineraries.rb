class AddDetailsToItineraries < ActiveRecord::Migration[5.2]
  def change
    add_column :itineraries, :start, :date
    add_column :itineraries, :end, :date
  end
end
