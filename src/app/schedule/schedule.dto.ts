export class CreateScheduleDto {
  status: 'default' | 'process' | 'canceled' | 'completed';
  is_notified: boolean;
  start_date: string;
  end_date: string;
  session_time: string;
  service_category: string;
  service_name: string;
  service_price: string;
}
