

export type Direction = 'up' | 'down'

export interface MoveEditorAction {
  id: string;
  direction: Direction
}

export interface DeleteEditorAction {
  id:string
}

export interface InsertEditorAction {
  id: string | null
}

export interface UpdateEditorAction {
  id: string
  content: string
}

