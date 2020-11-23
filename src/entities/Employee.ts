import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('employees')
class Employee {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  position: string;

  @Column()
  CPF: string;

  @Column()
  name: string;

  @Column()
  UF: string;

  @Column()
  salary: number;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;
}

export default Employee;
