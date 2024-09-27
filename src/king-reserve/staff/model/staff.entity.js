export class Staff {

    constructor(id, campaigns_id, name, last_name, email, on_job_status, job_description, date_start, date_end){
        this.id = id;
        this.campaigns_id = campaigns_id;
        this.name = name;
        this.last_name = last_name;
        this.email = email;
        this.on_job_status = on_job_status;
        this.job_description = job_description;
        this.date_start = date_start;
        this.date_end = date_end;
    }

    static fromDisplayableStaff(displayableStaff) {
        return new Staff(
            displayableStaff.id,
            displayableStaff.campaigns_id,
            displayableStaff.name,
            displayableStaff.last_name,
            displayableStaff.email,
            displayableStaff.on_job_status,
            displayableStaff.job_description,
            displayableStaff.date_start,
            displayableStaff.date_end,
        );
    }

    static toDisplayableStaff(staff){
        return{
            id: staff.id,
            campaigns_id: staff.campaigns_id,
            name: staff.name,
            last_name: staff.last_name,
            email: staff.email,
            on_job_status: staff.on_job_status,
            job_description: staff.job_description,
            date_start: staff.dateStart,
            date_end: staff.dateEnd,
        }
    }

}