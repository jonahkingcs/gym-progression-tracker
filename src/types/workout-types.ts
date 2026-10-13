import { ThemeColor } from '@/constants/theme';

export type SetData = {
    setNumber: number;
    weight: number | null;
    reps: number | null;
};

export type ExerciseData = {
    exerciseId: string;
    name: string;
    category: string;
    target: {
        sets: number;
        weight: number;
        repMin: number;
        repMax: number;
    };
    sets: SetData[];
};

export type ExerciseTableRow = {
    exercise_id: string;
    exercises: {
        name: string;
        category: string;
    };
    target_sets: number;
    target_weight: number;
    target_rep_min: number;
    target_rep_max: number;
};

export type ExerciseWidgetProps = {
    themeColor?: ThemeColor;
    exercise: ExerciseData;
    onExerciseChange: (exercise: ExerciseData) => void;
};

export type SetWidgetProps = {
    themeColor?: ThemeColor;
    setData: SetData;
    onSetChange: (set: SetData) => void;
};