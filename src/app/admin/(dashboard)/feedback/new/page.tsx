import { FeedbackForm } from "../feedback-form";
import { saveFeedback } from "../actions";
export default function NewFeedbackPage() { return <><h1 className="mb-6 text-3xl font-black">Thêm đánh giá</h1><FeedbackForm action={saveFeedback} /></>; }
