export default interface IEmployeeDTO {
  position: string;
  CPF: string;
  name: string;
  UF: string;
  salary: number;
  status: string;
  created_at?: Date;
}
