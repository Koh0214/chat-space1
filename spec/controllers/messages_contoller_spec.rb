require 'rails_helper'

describe MessagesController do

  describe 'GET #index' do

    it "renders the :index template" do
      group = create(:group)
      groups = create_list(:group, 3)
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
