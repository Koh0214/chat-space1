require 'rails_helper'

describe MessagesController, type: :controller do

  describe 'GET #index' do
    let(:user) { FactoryGirl.create(:user) }

    before do
      login_user user
    end

    it "renders the :index template" do
      group = user.groups.first
      get :index, params: { group_id: group.id }
      expect(response).to render_template :index
    end

    it "assigns the requested contact to @group" do
      group = user.groups.first
      get :index, params: { group_id: group.id }
      expect(assigns(:group)).to eq group
    end

    it "assigns the requested contact to @groups" do
      group = user.groups.first
      groups = user.groups
      get :index, params: { group_id: group.id }
      expect(assigns(:groups)).to eq groups
    end

  end

  # describe 'POST #create' do
  #   it "renders the :group_messages_path template" do
  #     post :create
  #     expect(response).to render_template :group_messages_path
  #   end
  # end
end
