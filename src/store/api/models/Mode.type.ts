interface ModeType {
  _id: string;
  slug: string;
  title: string;
  description: string;
  number_questions: number;
  price: number;
  is_certificate: boolean;
  is_explanation: boolean;
}

export default ModeType;
