type Post = {
    entity_type: "post";
    creator: string;
    labels: string[];
    text: string;
    metadata: {
      uuid: string;
      time_stamp: string;
      added_files: string[];
    };
  };
  
  type Email = {
    entity_type: "email";
    creator: string;
    recipient: string;
    labels: string[];
    subject: string;
    body: string;
    metadata: {
      uuid: string;
      time_stamp: string;
      attachments: string[];
      cc?: string[];
      bcc?: string[];
    };
  };
  
  type Ticket = {
    entity_type: "ticket";
    creator: string;
    labels: string[];
    subject: string;
    description: string;
    metadata: {
      uuid: string;
      time_stamp: string;
      attachments: string[];
      assigned_to: string;
      priority: "low" | "medium" | "high";
    };
  };
  
  // Type for the entire array
 export type EntitiesArray = (Post | Email | Ticket);