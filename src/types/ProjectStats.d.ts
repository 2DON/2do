interface ProjectStats {
  week: {
    date: Date;
    created: number;
    updated: number;
    createdBy: Dict<number>;
    updatedBy: Dict<number>;
  }[];
}
