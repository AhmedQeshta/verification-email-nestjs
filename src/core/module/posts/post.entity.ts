import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Post extends Model {
  @Column
  title: string;

  @Column
  description: string;
}
