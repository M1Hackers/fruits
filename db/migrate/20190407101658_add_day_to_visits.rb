class AddDayToVisits < ActiveRecord::Migration[5.2]
  def change
    add_column :visits, :day, :integer
  end
end
