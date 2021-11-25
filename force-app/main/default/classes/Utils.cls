public with sharing class Utils {

	public static string returnType( Object whatTypeAmI )
	{
		String name = 'undefined';

		If( whatTypeAmI instanceof Integer )
		{
			name = 'Integer';
		}
		else if( whatTypeAmI instanceof Double)
		{
			name = 'Double';
		}
		else if( whatTypeAmI instanceof String)
		{
			name = 'String';
		}
		else if( whatTypeAmI instanceof Blob)
		{
			name = 'Blob';
		}
		else if( whatTypeAmI instanceof Boolean)
		{
			name = 'Boolean';
		}
		else if( whatTypeAmI instanceof Date)
		{
			name = 'Date';
		}
		else if( whatTypeAmI instanceof Datetime)
		{
			name = 'DateTime';
		}
		else if( whatTypeAmI instanceof Decimal)
		{
			name = 'Decimal';
		}
		else if( whatTypeAmI instanceof ID)
		{
			name = 'Id';
		}
		else if( whatTypeAmI instanceof Long)
		{
			name = 'Long';
		}
		else if( whatTypeAmI instanceof Time)
		{
			name = 'Time';
		}

		return(name);
	}
}
