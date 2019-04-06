class CreateVisits < ActiveRecord::Migration[5.2]
  def change
    create_table :visits do |t|
      t.string :name
      t.float :latitude
      t.float :longitude
      t.float :rating
      t.datetime :start
      t.datetime :end
      t.references :itinerary, foreign_key: true

      t.timestamps
    end
  end
end
