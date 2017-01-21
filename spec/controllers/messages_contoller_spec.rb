require 'rails_helper'

describe MessagesController, type: :controller do

  describe 'GET #index' do
    let(:user) { FactoryGirl.create(:user) }

    before do
      login_user user
    end

    it "renders the :index template" do
      group = user.groups.first
      binding.pry
      get :index, params: { group_id: group.id }
      expect(response).to render_template :index
    end
  end

  # describe 'POST #create' do
  #   it "renders the :group_messages_path template" do
  #     post :create
  #     expect(response).to render_template :group_messages_path
  #   end
  # end
end
