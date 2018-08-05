export class RequisitionCourse {
    public id: string;
    public student_id: string;
    public tutor_id: string;
    public sent_date: string;
    public subject_id: string;
    public tuition: string;
    public total_session: string;
    public time_session: string;
    public schedule: string;
    public description: string;
    public status: string;
    public comment: string;

    constructor(data?: any) {
        this.id = data.id;
        this.student_id = data.student_id;
        this.tutor_id = data.tutor_id;
        this.sent_date = data.sent_date;
        this.subject_id = data.subject_id;
        this.tuition = data.tuition;
        this.total_session = data.total_session;
        this.time_session = data.time_session;
        this.schedule = data.schedule;
        this.description = data.description;
        this.status = data.status;
        this.comment = data.comment;
    }
}