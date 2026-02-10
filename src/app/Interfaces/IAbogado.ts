export interface IAbogado {
  id: number;
  nombres: string;
  especialidad?: string;
  descripcion?: string;
  fotoUrl?: string;
  linkedin?: string;
  email?: string;
  orden?: number;
  activo?: boolean;
  fechaCreacion?: Date;
}
