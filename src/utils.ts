export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  })
}

export function lighten(color: string, percentage: number) {
  return `color-mix(in hsl, ${color}, var(--pure-white) ${percentage * 100}%)`;
}

export function darken(color: string, percentage: number) {
  return `color-mix(in hsl, ${color}, var(--pure-black) ${percentage * 100}%)`;
}

export async function sql_query(query: String) {
  const response = await fetch('/api/database/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(query),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function sql_update(query: String) {
  const response = await fetch('/api/database/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(query),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // console.log(await response.json())
  // return response.json();
}

// TODO: different functionality for sql_delete & update
export async function sql_delete(query: String) {
  const response = await fetch('/api/database/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(query),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // console.log(await response.json())
  // return response.json();
}

// TODO: different functionality for sql_delete & update
export async function sql_insert(query: String) {
  const response = await fetch('/api/database/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(query),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // console.log(await response.json())
  // return response.json();
}

export function format_course_time(begin: number, end: number): string {
  if (begin < 0 || begin > 1439 || end < 0 || end > 1439) {
    return 'invalid time';
  }

  const begin_hours: number = Math.floor(begin / 60);
  const begin_minutes: number = begin % 60;
  const end_hours: number = Math.floor(end / 60);
  const end_minutes: number = end % 60;

  const display_begin_hour: number = begin_hours % 12 || 12;
  const display_end_hour: number = end_hours % 12 || 12;

  const ampm: string = end_hours >= 12 ? 'PM' : 'AM';

  const formatted_begin: string = `${display_begin_hour}:${begin_minutes.toString().padStart(2, '0')}`;
  const formatted_end: string = `${display_end_hour}:${end_minutes.toString().padStart(2, '0')} ${ampm}`;


  return formatted_begin + "-" + formatted_end;
}
