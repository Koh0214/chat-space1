class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group

  mount_uploader :image, ImageUploader


  validate :present_body_or_image

  def present_body_or_image
    if !body.present? && !image.present?
      errors.add(:body, "can't be in the past")
    end
  end

end
