export interface ExpenseDataToApi_int {
  expenseType: string;
  expenseAmount: string;
  expenseDate: string;
  expenseCategory: string;
  expenseDesc: string;
}

// get all expense data

export interface SingleExpense {
  id: string;
  createdBy: string;
  expenseType: string;
  expenseAmount: string;
  expenseDate: string;
  expenseCategory: string;
  expenseDesc: string;
  createdAt?: string;
  updatedAt?: string;
}

// category stack
export type Category_type = "food" | "fashion" | "other";

// expense details props
export interface ExpenseDetailsProps_int {
  totalExpense: number;
  totalIncome: number;
  categoryStack: Record<string, number>;
  incomeArray?: SingleExpense[];
  expenseArray?: SingleExpense[];
  callBack?: () => void;
}

// expesne form props
export interface ExpenseFormProps_int {
  callBack: () => void;
}

// expense entries props
export interface ExpenseEntriesProps_int {
  incomeArray: SingleExpense[];
  expenseArray: SingleExpense[];
  wholeArray: SingleExpense[];
  onTypeSelection: (data: string) => void;
  callBack?: (pageNo?: number, limit?: number, expense_type?: string) => void;
  // for pagination
  // paginationPageHandler: (pageNo: number) => void;
  totalExpensePages: number;
}

// EntryCard props interface
export interface EntryCardProps_int {
  val: SingleExpense;
  index: number;
  categoryListArr: string[];
  callBack?: () => void;
}

export const categoryListArrayFromTypes = [
  "other",
  "food",
  "fashion",
  "beauty",
  "education",
  "households",
];

export const categoryListArrayIncomeFromTypes = ["Salary", "other"];
