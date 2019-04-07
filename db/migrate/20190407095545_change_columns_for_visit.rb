class ChangeColumnsForVisit < ActiveRecord::Migration[5.2]
  def self.up
    change_table :visits do |t|
      t.change :start, :time
      t.change :end, :time
    end
  end
  def self.down
    change_table :visits do |t|
      t.change :start, :datetime
      t.change :end, :datetime
    end
  end
end
