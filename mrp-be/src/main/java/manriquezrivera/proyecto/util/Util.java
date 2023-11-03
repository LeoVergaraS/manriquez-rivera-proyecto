package manriquezrivera.proyecto.util;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;



import manriquezrivera.proyecto.models.ConsultaSesiones;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class Util {

        public List<ConsultaSesiones> rellenadorDeCeros (List<ConsultaSesiones> consultaSesiones, String fechaInicio, String fechaFin, Integer dropSelect){ 
        // Se crea una lista de sesiones vacía. Esta lista será la que se devuelva al
		// final
		List<ConsultaSesiones> consultaSesiones2 = new ArrayList<ConsultaSesiones>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		// Se crea un arreglo que contenga las fechas que existen entre fechaInicio y
		// fechaFin
		List<String> fechas = new ArrayList<String>();
		fechas.add(fechaFin);

		// Se obtienen las fechas entre fechaInicio y fechaFin
		int i = 1;
		while (i <= dropSelect) {
			Calendar instance = Calendar.getInstance();
			Date date = new Date();
			try {
				date = sdf.parse(fechaFin);
			} catch (ParseException e) {
				e.printStackTrace();
			}
			instance.setTime(date);
			instance.add(Calendar.DATE, -i);
			String fechaString = sdf.format(instance.getTime());
			fechas.add(fechaString);
			i++;
		}
		// invertir orden de un arrgelo
		List<String> fechasInvertidas = new ArrayList<String>();
		for (int j = fechas.size() - 1; j >= 0; j--) {
			fechasInvertidas.add(fechas.get(j));
		}

		// Se pone de tiempo 0 en las fechas que no se encontraron seriones
		i = 0;
		int j = 0;
		while (i < dropSelect) {
			if (consultaSesiones.size() == 0) {
				int k = 0;
				while (k < dropSelect) {
					ConsultaSesiones consultaNueva = new ConsultaSesiones();
					consultaNueva.setFecha(java.sql.Date.valueOf(fechasInvertidas.get(k)));
					consultaNueva.setTiempo(0L);
					consultaSesiones2.add(consultaNueva);
					k++;
				}
				break;
			} else if (j < consultaSesiones.size()) {
				if (fechasInvertidas.get(i).equals(consultaSesiones.get(j).getFecha().toString())) {
					consultaSesiones2.add(consultaSesiones.get(j));
					i++;
					j++;
				} else {
					j++;
				}
			} else {
				ConsultaSesiones consultaNueva = new ConsultaSesiones();
				consultaNueva.setFecha(java.sql.Date.valueOf(fechasInvertidas.get(i)));
				consultaNueva.setTiempo(0L);
				consultaSesiones2.add(consultaNueva);
				i++;
				j = 0;
			}
		}
        return consultaSesiones2;
     }
}
