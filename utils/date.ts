export function formatBrazilianDate(dateISOString: string): string {
    const originalDate = new Date(dateISOString);
  
    // Convert to Brazil timezone (America/Sao_Paulo)
    const brazilTimeString = originalDate.toLocaleString('en-US', {
      timeZone: 'America/Sao_Paulo',
    });
    const brazilDate = new Date(brazilTimeString);
  
    const nowString = new Date().toLocaleString('en-US', {
      timeZone: 'America/Sao_Paulo',
    });
    const now = new Date(nowString);
  
    const isToday =
      brazilDate.getDate() === now.getDate() &&
      brazilDate.getMonth() === now.getMonth() &&
      brazilDate.getFullYear() === now.getFullYear();
  
    const timeDifferenceMs = now.getTime() - brazilDate.getTime();
    const timeDifferenceHours = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
  
    const monthAbbreviations = [
      'jan', 'fev', 'mar', 'abr', 'mai', 'jun',
      'jul', 'ago', 'set', 'out', 'nov', 'dez',
    ];
  
    const day = brazilDate.getDate();
    const month = monthAbbreviations[brazilDate.getMonth()];
    const year = brazilDate.getFullYear();
    const hours = brazilDate.getHours().toString().padStart(2, '0');
    const minutes = brazilDate.getMinutes().toString().padStart(2, '0');
  
    if (isToday && timeDifferenceHours <= 12) {
      return `${day} de ${month} de ${year} - ${timeDifferenceHours} hora${timeDifferenceHours !== 1 ? 's' : ''} atrás`;
    } else {
      return `${day} de ${month} de ${year} às ${hours}:${minutes}`;
    }
}
  