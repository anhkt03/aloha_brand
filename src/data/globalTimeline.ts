/**
 * 12-month roadmap for a September-intake application.
 * `keyMonth` starts from Aug (–1, i.e. before the target start) and rolls
 * through to the departure the following Aug.
 */
export interface TimelineStep {
  monthRange: string;
  title: string;
  desc: string;
}

export const globalTimeline: TimelineStep[] = [
  {
    monthRange: "Tháng 8 – 9",
    title: "Đánh giá năng lực & chọn ngành",
    desc: "Test đầu vào ngôn ngữ, tư vấn chọn quốc gia, chọn ngành phù hợp năng lực và ngân sách.",
  },
  {
    monthRange: "Tháng 9 – 12",
    title: "Học ngoại ngữ & luyện chứng chỉ",
    desc: "Tăng tốc TOPIK / JLPT / HSK / IELTS để đạt ngưỡng tối thiểu của trường mục tiêu.",
  },
  {
    monthRange: "Tháng 12 – 1",
    title: "Hoàn thiện hồ sơ apply",
    desc: "Bảng điểm, thư giới thiệu, kế hoạch học tập, portfolio, dịch thuật công chứng.",
  },
  {
    monthRange: "Tháng 1 – 3",
    title: "Nộp hồ sơ & săn học bổng",
    desc: "Apply đồng thời nhiều trường và các quỹ học bổng phù hợp; theo dõi phản hồi.",
  },
  {
    monthRange: "Tháng 3 – 5",
    title: "Nhận offer & xác nhận",
    desc: "Đối chiếu offer, đàm phán học bổng, đặt cọc và xin COE / I-20.",
  },
  {
    monthRange: "Tháng 5 – 7",
    title: "Xin visa & phỏng vấn",
    desc: "Luyện phỏng vấn, chuẩn bị chứng minh tài chính, khám sức khỏe.",
  },
  {
    monthRange: "Tháng 7 – 8",
    title: "Lên đường & định cư",
    desc: "Vé máy bay, đón sân bay, chỗ ở, tài khoản ngân hàng, hòa nhập môi trường mới.",
  },
];
