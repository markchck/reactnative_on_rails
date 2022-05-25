class NoteSerializer
  include FastJsonapi::ObjectSerializer
  attributes :text
end
