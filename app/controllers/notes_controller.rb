class NotesController < ApplicationController
  # before_action :authenticate_user!
  def index
    notes = Note.all
    # render json: notes, status: :ok
    render json: NoteSerializer.new(notes).serializable_hash.to_json
  end
  
  def show
    notes = Note.find(params[:id])
    render json: NoteSerializer.new(notes).serializable_hash.to_json
    # render json: notes, status: :ok
  end
  
  def create
    # notes = Note.create!(text: params[:text])
    notes = Note.create(note_params)
    render json: NoteSerializer.new(notes).serializable_hash.to_json
  end

  def update
    notes = Note.find(params[:id])

    # 1. 이 방법도 되고
    # notes.text = params[:text]
    # notes.save
    
    # 2. 이 방법도 되는데
    notes.update(note_params)
    # notes.update(text: parmas[:text])    

    # 3. 이건 에러 뜸
    # updated_notes = notes.update(note_params)
    # render json: NoteSerializer.new(updated_notes).serializable_hash.to_json

    render json: NoteSerializer.new(notes).serializable_hash.to_json
  end

  def destroy
    # notes = Note.find(params[:id])
    # notes.destroy
    Note.destroy(params[:id])
  end

  private
    def note_params
      params.require(:note).permit(:text)
    end
end
