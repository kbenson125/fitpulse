export const workoutPlans = {
  weight_loss: [
    {
      day: 'Monday',
      focus: 'Cardio & Full Body Burn',
      items: [
        { type: 'walk', name: 'Brisk Morning Walk', duration: '30 mins', detail: 'Incline walk or high-pace outdoors' },
        { type: 'strength', name: 'Dumbbell Goblet Squats', duration: '3 sets x 12 reps', detail: 'Light/Medium Dumbbells' },
        { type: 'strength', name: 'Resistance Band Rows', duration: '3 sets x 15 reps', detail: 'Medium Resistance Band' },
        { type: 'strength', name: 'Jumping Jacks / Bodyweight Circuit', duration: '3 rounds x 45 sec', detail: 'High intensity interval' }
      ]
    },
    {
      day: 'Wednesday',
      focus: 'Interval Running & Core',
      items: [
        { type: 'run', name: 'C25K Running Intervals', duration: '25 mins', detail: '1 min jog / 1.5 min walk intervals' },
        { type: 'strength', name: 'Dumbbell Overhead Press', duration: '3 sets x 10 reps', detail: 'Medium Dumbbells' },
        { type: 'strength', name: 'Planks & Mountain Climbers', duration: '3 sets x 45 sec', detail: 'Bodyweight core focus' }
      ]
    },
    {
      day: 'Friday',
      focus: 'Endurance & Toning',
      items: [
        { type: 'walk', name: 'Recovery Walk', duration: '45 mins', detail: 'Steady pace' },
        { type: 'strength', name: 'Dumbbell Romanian Deadlifts', duration: '3 sets x 12 reps', detail: 'Focus on hamstrings/glutes' },
        { type: 'strength', name: 'Push-Ups (Floor or Incline)', duration: '3 sets to failure', detail: 'Bodyweight' }
      ]
    }
  ],
  muscle_gain: [
    {
      day: 'Monday',
      focus: 'Upper Body Resistance',
      items: [
        { type: 'strength', name: 'Dumbbell Floor Chest Press', duration: '4 sets x 8-10 reps', detail: 'Heavy Dumbbells' },
        { type: 'strength', name: 'Single-Arm Dumbbell Rows', duration: '4 sets x 10 reps', detail: 'Medium to Heavy Dumbbells' },
        { type: 'strength', name: 'Bicep Curls to Overhead Tricep Ext', duration: '3 sets x 12 reps', detail: 'Resistance Bands or Dumbbells' },
        { type: 'walk', name: 'Cooldown Walk', duration: '15 mins', detail: 'Light intensity' }
      ]
    },
    {
      day: 'Wednesday',
      focus: 'Lower Body & Core Hypertrophy',
      items: [
        { type: 'strength', name: 'Dumbbell Goblet Squats', duration: '4 sets x 8-10 reps', detail: 'Progressive heavy weight' },
        { type: 'strength', name: 'Dumbbell Lunges', duration: '3 sets x 10/leg', detail: 'Medium Dumbbells' },
        { type: 'strength', name: 'Band Resistance Glute Bridges', duration: '3 sets x 15 reps', detail: 'Heavy Resistance Band' },
        { type: 'run', name: 'Light Jog', duration: '15 mins', detail: 'Maintain active recovery' }
      ]
    },
    {
      day: 'Friday',
      focus: 'Full Body Sculpt',
      items: [
        { type: 'strength', name: 'Dumbbell Clean & Press', duration: '3 sets x 10 reps', detail: 'Full body compound movement' },
        { type: 'strength', name: 'Renegade Rows', duration: '3 sets x 8/arm', detail: 'Dumbbells + core stabilization' },
        { type: 'walk', name: 'Brisk Walk', duration: '20 mins', detail: 'Aerobic fitness base' }
      ]
    }
  ],
  maintenance: [
    {
      day: 'Tuesday',
      focus: 'Cardio & Strength Balanced',
      items: [
        { type: 'run', name: 'Steady State Run', duration: '25 mins', detail: 'Moderate tempo' },
        { type: 'strength', name: 'Dumbbell Squat-to-Press', duration: '3 sets x 10 reps', detail: 'Medium Dumbbells' },
        { type: 'strength', name: 'Bodyweight Push-ups & Rows', duration: '3 sets x 12 reps', detail: 'Dumbbells or Resistance Bands' }
      ]
    },
    {
      day: 'Thursday',
      focus: 'Active Mobility & Strength',
      items: [
        { type: 'walk', name: 'Brisk Power Walk', duration: '35 mins', detail: 'Sustained heart rate' },
        { type: 'strength', name: 'Dumbbell Deadlifts', duration: '3 sets x 10 reps', detail: 'Medium weights' },
        { type: 'strength', name: 'Band Woodchoppers & Core', duration: '3 sets x 15 reps', detail: 'Band core stability' }
      ]
    }
  ]
};