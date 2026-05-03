type Scenario = {
  id: string;
  title: string;
  desc?: string;
  context?: string;
  level?: string;
  dialogue?: Array<{
    speaker: string;
    name?: string;
    text: string;
    translation?: string;
  }>;
  prompts?: string[];
  vocabulary?: Array<{
    word: string;
    meaning?: string;
    phrase?: string;
    translation?: string;
  }>;
};
