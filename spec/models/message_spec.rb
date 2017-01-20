require 'rails_helper'

describe Message do

  context "is valid" do
    it "with a body, user_id, group_id" do
      message = build(:message)
      expect(message).to be_valid
    end
  end

  context "is invalid" do
    it "without body" do
      message = build(:message, body:"")
      message.valid?
      expect(message.errors[:body]).to include("が入力されていません。")
    end

    it "without group_id" do
      message = build(:message, group_id: nil)
      message.valid?
      expect(message.errors[:group_id]).to include("が入力されていません。")
    end

    it "without user_id" do
      message = build(:message, user_id: nil)
      message.valid?
      expect(message.errors[:user_id]).to include("が入力されていません。")
    end
  end
end
