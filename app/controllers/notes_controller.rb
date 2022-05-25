class NotesController < ApplicationController
  def index
    notes = Note.all
    # render json: notes, status: :ok
    render json: NoteSerializer.new(notes).serializable_hash.to_json
    # render json: AirlineSerializer.new(airlines, options).serializable_hash.to_json
  end

  def create
    notes = Note.create!(note_params)
    render json: NoteSerializer.new(notes).serializable_hash.to_json
    # render json: notes, status: :ok
  end

  private
  def note_params
    params.require(:note).permit(:text)
  end
end
