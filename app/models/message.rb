class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group

  mount_uploader :image, ImageUploader

  validate :present_body_or_image

  def present_body_or_image
    errors.add(:body, "can't be blank body and image") if !body? && !image?
  end

end
