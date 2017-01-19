require 'rails_helper'

describe Message do
  context "valid" do
    it "is valid with a body, user_id, group_id" do
      message = build(:message)
      expect(message).to be_valid
    end
  end

  context "invalid" do
    it "is invalid without body" do
      message = build(:message, body:"")
      message.valid?
      expect(message.errors[:body]).to include("が入力されていません。")
    end

    it "is invalid without group_id" do
      message = build(:message, group_id: nil)
      message.valid?
      expect(message.errors[:group_id]).to include("が入力されていません。")
    end

    it "is invalid without user_id" do
      message = build(:message, user_id: nil)
      message.valid?
      expect(message.errors[:user_id]).to include("が入力されていません。")
    end
  end
end
