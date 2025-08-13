type Exam = {
  examId?: number;
  examName: string;
  examTime: number;
  totalMarks: number;
  passMarks: number;
  numberOfQuestions: number;
  questionIds: number[];
};

export default Exam;
