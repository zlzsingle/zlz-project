package com.tycom.util;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.util.StringUtils;

/**
 * General purpose date utilities.
 *
 * @author
 * @since 2008-03-01
 */
public abstract class DateUtils extends Object {
	private static final Logger log = Logger.getLogger(DateUtils.class);

	public static final long millisInDay = 86400000;

	/**
	 * yyyy-MM-dd
	 */
	public final static String DATE_WITHOUT_TIME = "yyyy-MM-dd";

	/**
	 * yyyyMMdd
	 */
	public final static String YMD = "yyyyMMdd";
	/**
	 * yyyy-MM-dd HH:mm:ss.zzz
	 */
	public final static String YMD_HMS_MSEC = "yyyy-MM-dd HH:mm:ss.SS";
	/**
	 * yyyy-MM-dd HH:mm:ss
	 */
	public final static String YMD_HMS = "yyyy-MM-dd HH:mm:ss";

	/**
	 * yyyyMMddHHmmss
	 */
	public final static String YMD_HMS_WITHOUT = "yyyyMMddHHmmss";

	/**
	 * yyyy-MM
	 */
	public final static String YEAR_AND_MONTH_ = "yyyy-MM";

	/**
	 * yyyyMM
	 */
	public final static String YEAR_AND_MONTH = "yyyyMM";

	public final static String YEAR = "yyyy";

	public final static String MONTH = "MM";

	public final static String DAY = "dd";

	/** 等于*/
	public final static int EQ = 0;

	/** 大于*/
	public final static int GT = 1;

	/** 小于*/
	public final static int LT = 2;

	// some static date formats
	private static SimpleDateFormat[] mDateFormats = loadDateFormats();

	private static final SimpleDateFormat mFormat8chars = new SimpleDateFormat(YMD);

	private static final SimpleDateFormat mFormatIso8601Day = new SimpleDateFormat(DATE_WITHOUT_TIME);

	private static final SimpleDateFormat mFormatIso8601 = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ");

	// http://www.w3.org/Protocols/rfc822/Overview.html#z28
	private static final SimpleDateFormat mFormatRfc822 = new SimpleDateFormat("EEE, d MMM yyyy HH:mm:ss z");

	private static SimpleDateFormat[] loadDateFormats() {
		SimpleDateFormat[] temp = {
				new SimpleDateFormat(YMD),
				new SimpleDateFormat(DATE_WITHOUT_TIME),
				new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ"),
				new SimpleDateFormat("EEE, d MMM yyyy HH:mm:ss z"),
				new SimpleDateFormat("EEE MMM d HH:mm:ss z yyyy"), // standard
				new SimpleDateFormat("M/d/yy hh:mm:ss"), new SimpleDateFormat("M/d/yyyy hh:mm:ss"),
				new SimpleDateFormat("M/d/yy hh:mm a"),
				new SimpleDateFormat("M/d/yyyy hh:mm a"),
				new SimpleDateFormat("M/d/yy HH:mm"),
				new SimpleDateFormat("M/d/yyyy HH:mm"),
				new SimpleDateFormat("dd.MM.yyyy HH:mm:ss"),
				new SimpleDateFormat("yy-MM-dd HH:mm:ss.SSS"),
				new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS"), // standard
				new SimpleDateFormat("M-d-yy HH:mm"), new SimpleDateFormat("M-d-yyyy HH:mm"),
				new SimpleDateFormat("MM/dd/yyyy HH:mm:ss.SSS"), new SimpleDateFormat("M/d/yy"),
				new SimpleDateFormat("M/d/yyyy"), new SimpleDateFormat("M-d-yy"), new SimpleDateFormat("M-d-yyyy"),
				new SimpleDateFormat("MMMM d, yyyyy"), new SimpleDateFormat("MMM d, yyyyy") };

		return temp;
	}

	/**
	 * 取得yyyyMMdd格式的时间格式转换器
	 *
	 * @return
	 */
	public static java.text.SimpleDateFormat get8charDateFormat() {
		return DateUtils.mFormat8chars;
	}

	// -----------------------------------------------------------------------
	/**
	 * 取得格式转换器数组 new SimpleDateFormat("EEE MMM d HH:mm:ss z yyyy"), // standard
	 * new SimpleDateFormat("M/d/yy hh:mm:ss"), new SimpleDateFormat("M/d/yyyy
	 * hh:mm:ss"), new SimpleDateFormat("M/d/yy hh:mm a"), new
	 * SimpleDateFormat("M/d/yyyy hh:mm a"), new SimpleDateFormat("M/d/yy
	 * HH:mm"), new SimpleDateFormat("M/d/yyyy HH:mm"), new
	 * SimpleDateFormat("dd.MM.yyyy HH:mm:ss"), new SimpleDateFormat("yy-MM-dd
	 * HH:mm:ss.SSS"), new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS"), //
	 * standard new SimpleDateFormat("M-d-yy HH:mm"), new
	 * SimpleDateFormat("M-d-yyyy HH:mm"), new SimpleDateFormat("MM/dd/yyyy
	 * HH:mm:ss.SSS"), new SimpleDateFormat("M/d/yy"), new
	 * SimpleDateFormat("M/d/yyyy"), new SimpleDateFormat("M-d-yy"), new
	 * SimpleDateFormat("M-d-yyyy"), new SimpleDateFormat("MMMM d, yyyyy"), new
	 * SimpleDateFormat("MMM d, yyyyy") DATE_WITHOUT_TIME = "yyyy-MM-dd"
	 */
	private static SimpleDateFormat[] getFormats() {
		return mDateFormats;
	}

	/**
	 * 将字符串转为日期 格式可以是: new SimpleDateFormat("EEE MMM d HH:mm:ss z yyyy"), //
	 * standard new SimpleDateFormat("M/d/yy hh:mm:ss"), new
	 * SimpleDateFormat("M/d/yyyy hh:mm:ss"), new SimpleDateFormat("M/d/yy hh:mm
	 * a"), new SimpleDateFormat("M/d/yyyy hh:mm a"), new
	 * SimpleDateFormat("M/d/yy HH:mm"), new SimpleDateFormat("M/d/yyyy HH:mm"),
	 * new SimpleDateFormat("dd.MM.yyyy HH:mm:ss"), new
	 * SimpleDateFormat("yy-MM-dd HH:mm:ss.SSS"), new
	 * SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS"), // standard new
	 * SimpleDateFormat("M-d-yy HH:mm"), new SimpleDateFormat("M-d-yyyy HH:mm"),
	 * new SimpleDateFormat("MM/dd/yyyy HH:mm:ss.SSS"), new
	 * SimpleDateFormat("M/d/yy"), new SimpleDateFormat("M/d/yyyy"), new
	 * SimpleDateFormat("M-d-yy"), new SimpleDateFormat("M-d-yyyy"), new
	 * SimpleDateFormat("MMMM d, yyyyy"), new SimpleDateFormat("MMM d, yyyyy") ,
	 * DATE_WITHOUT_TIME = "yyyy-MM-dd"
	 */
	public static Date parse(String aValue) {
		if (!StringUtils.hasText(aValue))
			return null;
		// get DateUtil's formats
		SimpleDateFormat formats[] = DateUtils.getFormats();
		if (formats == null)
			return null;
		// iterate over the array and parse
		Date myDate = null;
		for (int i = 0; i < formats.length; i++) {
			try {
				myDate = DateUtils.parse(aValue, formats[i]);
				if (myDate instanceof Date)
					return myDate;
			} catch (Exception e) {
				// do nothing because we want to try the next
				// format if current one fails
			}
		}
		// haven't returned so couldn't parse
		return null;
	}

	/**
	 * 将时间转为yyyyMMdd格式的字符串
	 *
	 * @param date
	 * @return
	 */
	public static String format8chars(Date date) {
		return DateUtils.format(date, mFormat8chars);
	}

	/**
	 * yyyy-MM-dd
	 *
	 * @param date
	 * @return
	 */
	public static String formatIso8601Day(Date date) {
		return DateUtils.format(date, mFormatIso8601Day);
	}

	/**
	 * EEE, d MMM yyyy HH:mm:ss z
	 *
	 * @param date
	 * @return
	 */
	public static String formatRfc822(Date date) {
		return DateUtils.format(date, mFormatRfc822);
	}

	/**
	 * yyyy-MM-dd'T'HH:mm:ssZ
	 *
	 * @param date
	 * @return
	 */
	public static String formatIso8601(Date date) {
		if (date == null)
			return "";

		// Add a colon 2 chars before the end of the string
		// to make it a valid ISO-8601 date.

		String str = DateUtils.format(date, mFormatIso8601);
		StringBuffer sb = new StringBuffer();
		sb.append(str.substring(0, str.length() - 2));
		sb.append(":");
		sb.append(str.substring(str.length() - 2));
		return sb.toString();
	}

	/** 日期转换成字符串，格式为format规定 */
	public static String format(final Date date, final String format) {
		SimpleDateFormat sf = new SimpleDateFormat(format);
		return format(date, sf);
	}

	/** 日期转换成字符串，格式为format规定，同 format(final Date date, final String format) 方法 */
	public static String date2Str(final Date date, final String format) {
		return format(date, format);
	}

	/** 日期转换成字符串，字符格式规定为“yyyy-MM-dd” */
	public static String date2Str(final Date date) {
		return format(date, DATE_WITHOUT_TIME);
	}

	/** 日期转换成字符串，字符格式规定为“yyyy-MM-dd” */
	public static String dateTime2Str(final Date date) {
		return format(date, YMD_HMS);
	}
	/** 日期转换成字符串，带毫秒*/
	public static String dateTime2MillStr(final Date date) {
		return format(date, YMD_HMS_MSEC);
	}
	/**
	 * -将字符转为java.sql.Timestamp
	 */
	public static java.sql.Timestamp parseTimestamp(String aValue) {
		if (!StringUtils.hasText(aValue))
			return null;
		// call the regular Date formatter
		Date myDate = DateUtils.parse(aValue);
		if (myDate != null)
			return new java.sql.Timestamp(myDate.getTime());
		return null;
	}

	// -----------------------------------------------------------------------
	/**
	 * 取得当前java.sql.Timestamp类型的时间
	 */
	public static java.sql.Timestamp now() {
		return new java.sql.Timestamp(new java.util.Date().getTime());
	}

	// -----------------------------------------------------------------------
	/**
	 * 将时间按指定格式转换
	 */
	public static String format(Date aDate, SimpleDateFormat aFormat) {
		if (aDate == null || aFormat == null) {
			return "";
		}
		return aFormat.format(aDate);
	}

	// -----------------------------------------------------------------------
	/**
	 * 将日期格式的字符串转为指定日期格式的字符串 aString:日期格式的字符串 aFormat:目标格式
	 */
	public static String formatDateString(String aString, SimpleDateFormat aFormat) {
		if (!StringUtils.hasText(aString) || aFormat == null)
			return "";
		try {
			java.sql.Timestamp aDate = parseTimestamp(aString);
			if (aDate != null) {
				return DateUtils.format(aDate, aFormat);
			}
		} catch (Exception e) {
			// Could not parse aString.
		}
		return "";
	}

	// -----------------------------------------------------------------------
	/**
	 * 将日期格式的字符串转为指定格式的日期类型 aValue:日期格式的字符串
	 *
	 * @throws ParseException
	 *
	 */
	public static Date parse(String aValue, SimpleDateFormat aFormat) throws ParseException {
		if (!StringUtils.hasText(aValue) || aFormat == null) {
			return null;
		}
		return aFormat.parse(aValue);
	}

	/**
	 * 将日期格式的字符串按指定的日期格式转换
	 *
	 * @param aValue
	 *            日期格式的字符串
	 * @param dateFormat
	 *            日期格式字符串
	 * @return
	 * @throws ParseException
	 */
	public static Date parse(String aValue, String dateFormat) throws ParseException {
		if (dateFormat == null) {
			return null;
		}
		return parse(aValue, new SimpleDateFormat(dateFormat));
	}

	/**
	 * 传进去的date_string应为yyyy-MM-dd格式 将字符串转为日期 返回的对象为Calendar
	 *
	 * @param date_string
	 * @return
	 */
	public static Calendar parseCalendar(String date_string) {
		return parseCalendar(date_string, "yyyy-MM-dd");
	}

	/**
	 * 将字符串转为日期 返回的对象为Calendar
	 *
	 * @param date_string
	 * @param format
	 * @return
	 */
	public static Calendar parseCalendar(String date_string, String format) {
		Calendar calendar = Calendar.getInstance();
		try {
			Date date = parse(date_string, format);
			calendar.setTime(date);
		} catch (Exception e) {
			log.warn(e);
		}
		return calendar;
	}

	/**
	 * 取当前日期，其格式为“yyyy-MM-dd HH:mm:ss.SS”
	 */
	public static String getTodayMSECStringDate() {
		return DateUtils.format(DateUtils.getTodayDate(), DateUtils.YMD_HMS_MSEC);
	}
	/**
	 * 取当前日期，其格式为“yyyy-MM-dd HH:mm:ss”
	 */
	public static String getTodayStringDate() {
		return DateUtils.format(DateUtils.getTodayDate(), DateUtils.YMD_HMS);
	}

	/**
	 * 取当前日期，其格式为“yyyy-MM-dd”
	 */
	public static String getTodayStringDay() {
		return DateUtils.format(DateUtils.getTodayDate(), DateUtils.DATE_WITHOUT_TIME);
	}

	/**
	 * 取当前日期，其格式为“yyyyMMdd”
	 */
	public static String getStringToday() {
		return DateUtils.format(DateUtils.getTodayDate(), DateUtils.YMD);
	}

	/**
	 * 取当前日期，其格式为pattern规定
	 */
	public static String getTodayStringDate(final String pattern) {
		return DateUtils.format(DateUtils.getTodayDate(), pattern);
	}

	/**
	 * 取当前年月，其格式为“yyyy-MM”
	 */
	public static String getYearAndMonth_() {
		return DateUtils.format(DateUtils.getTodayDate(), DateUtils.YEAR_AND_MONTH_);
	}

	/**
	 * 取当前年月，其格式为“yyyyMM”
	 */
	public static String getYearAndMonth() {
		return DateUtils.format(DateUtils.getTodayDate(), DateUtils.YEAR_AND_MONTH);
	}

	/**
	 * 取当前日期的上一年的日期，其格式为 format 规定
	 */
	public static String getBackYearDate(final String format) {
		Calendar c = Calendar.getInstance();
		c.add(Calendar.YEAR, -1);
		return DateUtils.format(c.getTime(), format);
	}

	/**
	 * 取当前日期的下一年的日期，其格式为 format 规定
	 */
	public static String getNextYearDate(final String format) {
		Calendar c = Calendar.getInstance();
		c.add(Calendar.YEAR, 1);
		return DateUtils.format(c.getTime(), format);
	}

	/**
	 * 取当前年季，其格式为“yyyyQ”
	 */
	public static String getYearAndQuarter() {
		return DateUtils.getStrYear() + DateUtils.getQuarter();
	}

	/**
	 * 取当前季度开始的一天，其格式为“yyyyMMdd”
	 */
	public static String getStartDateByCQ() {
		int quarter = DateUtils.getQuarter();
		if (quarter == 1)
			return DateUtils.getIntYear() + "0101";
		else if (quarter == 2)
			return DateUtils.getIntYear() + "0401";
		else if (quarter == 3)
			return DateUtils.getIntYear() + "0701";
		else
			return DateUtils.getIntYear() + "1001";
	}

	public static Timestamp getTodayTimestamp(){
		Timestamp t = new Timestamp(System.currentTimeMillis());
		return t;
	}

	/**
	 * 取当前日期
	 */
	public static Date getTodayDate() {
		long date = System.currentTimeMillis();
		java.sql.Date result = new java.sql.Date(date);
		return result;
	}

	/**
	 * 取当前日期, 不包含时间
	 */
	public static Date getTodayDateWithoutTime() {
		return transformDate(getTodayDate());
	}

	/**
	 * 取当前年
	 */
	public static int getIntYear() {
		return getTodayDate().getYear() + 1900;
	}

	public static String getStrYear() {
		return Integer.toString(getIntYear());
	}

	/**
	 * 取当前月份
	 */
	public static int getIntMonth() {
		return getTodayDate().getMonth() + 1;
	}

	public static int getIntMonth(Date date) {
		return date.getMonth() + 1;
	}

	public static int getIntMonthForJava() {
		return getTodayDate().getMonth();
	}

	/**
	 * 取得当前月份.如月小于10则在前面加0 如:"01"
	 */
	public static String getStrMonth() {
		return getIntMonth() < 10 ? "0" + getIntMonth() : Integer.toString(getIntMonth());
	}

	/**
	 * 取得指定时间是哪个月...如小于10则在前面加0 如:"01"
	 */
	public static String getStrMonth(Date date) {
		String str = null;
		if (date != null)
			str = getIntMonth(date) < 10 ? "0" + getIntMonth(date) : Integer.toString(getIntMonth(date));

		return str;
	}

	/**
	 * 取当前季度
	 */
	public static int getQuarter() {
		int quarter;
		int month = DateUtils.getIntMonth();
		if (month <= 3)
			quarter = 1;
		else if (month <= 6)
			quarter = 2;
		else if (month <= 9)
			quarter = 3;
		else
			quarter = 4;

		return quarter;
	}

	/**
	 * 取当前日
	 */
	public static int getIntDay() {
		return getTodayDate().getDate();
	}

	public static String getStrDay() {
		return getIntDay() < 10 ? "0" + Integer.toString(getIntDay()) : Integer.toString(getIntDay());
	}

	/**
	 * 取当前小时
	 */
	public static int getIntHours() {
		return Calendar.getInstance().get(Calendar.HOUR_OF_DAY);
	}

	public static String getStrHours() {
		return getIntHours() < 10 ? "0" + Integer.toString(getIntHours()) : Integer.toString(getIntHours());
	}

	public static String getStrHours(int hours) {
		return hours < 10 ? "0" + Integer.toString(hours) : Integer.toString(hours);
	}

	/**
	 * 字符串转换成日期，字符格式为pattern规定
	 */
	public static Date str2Date(final String date, final String pattern) {
		SimpleDateFormat sf = new SimpleDateFormat(pattern);
		Date dt = null;
		try {
			dt = sf.parse(date);
		} catch (ParseException e) {
			log.warn(e);
		}
		return dt;
	}

	/**
	 * 字符串转换成日期时间，带毫秒
	 */
	public static Date str2DateTimeMill(final String date) {
		return str2Date(date, YMD_HMS_MSEC);
	}
	/**
	 * 字符串转换成日期，字符格式规定为“yyyy-MM-dd”
	 */
	public static Date str2DateTime(final String date) {
		return str2Date(date, YMD_HMS);
	}

	/**
	 * 字符串转换成日期，字符格式规定为“yyyy-MM-dd”
	 */
	public static Date str2Date(final String date) {
		return str2Date(date, DATE_WITHOUT_TIME);
	}

	/**
	 * 字符串转换成日期，字符格式规定为“yyyyMM”
	 */
	public static Date str2Ym(final String date) {
		return str2Date(date, YEAR_AND_MONTH);
	}

	/**
	 * 日期转换，日期格式为pattern规定
	 */
	public static Date transformDate(final Date date, final String pattern) {
		SimpleDateFormat sf = new SimpleDateFormat(pattern);
		Date dt = null;
		try {
			dt = sf.parse(date2Str(date, pattern));
		} catch (ParseException e) {
			log.warn(e);
		}
		return dt;
	}

	/**
	 * 日期转换，日期格式规定为“yyyy-MM-dd”
	 */
	public static Date transformDate(final Date date) {
		return transformDate(date, DATE_WITHOUT_TIME);
	}

	/**
	 * 取指定年月中是周末的日期
	 */
	public static List getWeeks(int year, int month) {
		List weeks = new ArrayList();
		GregorianCalendar gc = new GregorianCalendar(year, month, 0);

		while (true) {
			gc.add(Calendar.DAY_OF_MONTH, 1);
			if (gc.get(Calendar.MONTH) > month || gc.get(Calendar.YEAR) > year)
				break;
			if (gc.get(Calendar.DAY_OF_WEEK) == 1 || gc.get(Calendar.DAY_OF_WEEK) == 7)
				weeks.add(DateUtils.date2Str(gc.getTime()));
		}

		return weeks;
	}

	/**
	 * 取指定日期段中是周末的日期
	 */
	public static List getWeeks(String dateFrom, String dateTo) {
		List weeks = new ArrayList();
		Calendar calendarFrom = parseCalendar(dateFrom);
		Calendar calendarTo = parseCalendar(dateTo);

		while (!calendarFrom.after(calendarTo)) {
			if (calendarFrom.get(Calendar.DAY_OF_WEEK) == 1 || calendarFrom.get(Calendar.DAY_OF_WEEK) == 7)
				weeks.add(DateUtils.date2Str(calendarFrom.getTime()));

			calendarFrom.add(Calendar.DAY_OF_MONTH, 1);
		}

		return weeks;
	}

	/**
	 * 取指定年月中不是周末的日期(指定月是从0开始计算，即month=0代表1月)
	 */
	@SuppressWarnings("unchecked")
	public static List getNotWeeks(int year, int month) {
		List days = new ArrayList();
		GregorianCalendar gc = new GregorianCalendar(year, month, 0);

		while (true) {
			gc.add(Calendar.DAY_OF_MONTH, 1);
			if (gc.get(Calendar.MONTH) > month || gc.get(Calendar.YEAR) > year)
				break;
			if (gc.get(Calendar.DAY_OF_WEEK) != 1 && gc.get(Calendar.DAY_OF_WEEK) != 7)
				days.add(DateUtils.date2Str(gc.getTime()));
		}

		return days;
	}

	/**
	 * 取指定日期段中不是周末的日期
	 */
	public static List getNotWeeks(String dateFrom, String dateTo) {
		List days = new ArrayList();
		Calendar calendarFrom = parseCalendar(dateFrom);
		Calendar calendarTo = parseCalendar(dateTo);

		while (!calendarFrom.after(calendarTo)) {
			if (calendarFrom.get(Calendar.DAY_OF_WEEK) != 1 && calendarFrom.get(Calendar.DAY_OF_WEEK) != 7)
				days.add(DateUtils.date2Str(calendarFrom.getTime()));

			calendarFrom.add(Calendar.DAY_OF_MONTH, 1);
		}

		return days;
	}

	/**
	 * 取指定日期所在周的第一天（周一的日期）,其格式为“yyyy-MM-dd”
	 * strDate参数表示字符日期格式,其格式规定为“yyyy-MM-dd”
	 */
	public static String getWeekBegin(String strDate) {
		Calendar cd = Calendar.getInstance();
		cd.setTime(DateUtils.str2Date(strDate));
		int dayOfWeek = cd.get(Calendar.DAY_OF_WEEK) - 1;// 获得日期是一周的第几天
		if (dayOfWeek == 1) {
			return strDate;
		} else {
			return DateUtils.date2Str(DateUtils.dateAdd(strDate, 5, 1 - (dayOfWeek == 0 ? 7 : dayOfWeek)));
		}
	}


	/**
	 * 取指定年月的字符串表示，格式为“yyyyMM”(指定月是从0开始计算，即month=0代表1月)
	 */
	public static String getStrMonth(int year, int month) {
		GregorianCalendar gc = new GregorianCalendar(year, month, 1);
		return format(gc.getTime(), DateUtils.YEAR_AND_MONTH);
	}

	public static String getStrYear(Date date) {
		String str = null;
		if (date != null)
			str = Integer.toString(date.getYear() + 1900);

		return str;
	}

	/**
	 * 实现年中文大写功能
	 */
	public static String getZhYear(String year) {
		StringBuffer sb = new StringBuffer();

		if (null != year) {
			char[] caps = { 'O', '一', '二', '三', '四', '五', '六', '七', '八', '九' };

			for (int i = 0; i < year.length(); i++) {
				char ch = year.charAt(i);
				sb.append(caps[ch - '0']);
			}
		}

		return sb.toString();
	}

	/**
	 * 实现月或日中文大写功能（两位数字）
	 */
	public static String getZhMonOrDay(String monOrDay) {
		StringBuffer sb = new StringBuffer();

		if (null != monOrDay && monOrDay.length() <= 2) {
			char[] caps = { '十', '一', '二', '三', '四', '五', '六', '七', '八', '九' };

			char ch;
			int i = 0;
			if (monOrDay.length() == 2) {
				ch = monOrDay.charAt(i);
				if (ch - '0' > 1)
					sb.append(caps[ch - '0']);

				sb.append(caps[0]);
				i++;
			}

			ch = monOrDay.charAt(i);
			if (ch - '0' > 0)
				sb.append(caps[ch - '0']);
		}

		return sb.toString();
	}

	/**
	 * java中对日期的加减操作
	 * gc.add(1, -1)表示年份减一.
	 * gc.add(2, -1)表示月份减一.
	 * gc.add(3, -1)表示周减一.
	 * gc.add(5, -1)表示天减一.
	 * 以此类推可以精确到毫秒.
	 * GregorianCalendar类的add(int field, int amount)方法表示年月日加减.
	 * strDate参数表示字符日期格式,其格式规定为“yyyy-MM-dd”
	 * field参数表示年,月,日等. amount参数表示要加减的数量.
	 */
	public static Date dateAdd(String strDate, int patt, int amount) {
		return dateAdd(str2Date(strDate), patt, amount);
	}

	/**
	 * java中对日期的加减操作
	 * gc.add(1, -1)表示年份减一.
	 * gc.add(2, -1)表示月份减一.
	 * gc.add(3, -1)表示周减一.
	 * gc.add(5, -1)表示天减一.
	 * 以此类推可以精确到毫秒.
	 * GregorianCalendar类的add(int field, int amount)方法表示年月日加减.
	 * strDate参数表示字符日期格式,pattern参数规定其格式
	 * field参数表示年,月,日等. amount参数表示要加减的数量.
	 */
	public static Date dateAdd(String strDate, String pattern, int patt, int amount) {
		return dateAdd(str2Date(strDate, pattern), patt, amount);
	}

	/**
	 * java中对日期的加减操作
	 * gc.add(1, -1)表示年份减一.
	 * gc.add(2, -1)表示月份减一.
	 * gc.add(3, -1)表示周减一.
	 * gc.add(5, -1)表示天减一.
	 * 以此类推可以精确到毫秒.
	 * GregorianCalendar类的add(int field, int amount)方法表示年月日加减.
	 * field参数表示年,月,日等. amount参数表示要加减的数量.
	 */
	public static Date dateAdd(Date date, int patt, int amount) {
		if (date == null) {
			return null;
		}
		GregorianCalendar gc = new GregorianCalendar();
		gc.setTime(date);
		return dateAdd(gc, patt, amount);
	}

	/**
	 * java中对日期的加减操作
	 * gc.add(1, -1)表示年份减一.
	 * gc.add(2, -1)表示月份减一.
	 * gc.add(3, -1)表示周减一.
	 * gc.add(5, -1)表示天减一.
	 * 以此类推可以精确到毫秒.
	 * GregorianCalendar类的add(int field, int amount)方法表示年月日加减.
	 * strDate参数表示字符日期格式,其格式规定为“yyyy-MM-dd”
	 * field参数表示年,月,日等. amount参数表示要加减的数量.
	 */
	public static Date dateAdd(GregorianCalendar gc, int patt, int amount) {
		if (gc == null) {
			return null;
		}
		gc.add(patt, amount);
		return gc.getTime();
	}

	/**
	 * 取出指定年月的最大天数, month 起始值为 1
	 */
	public static int getMaxDayInMonth(int year, int month) {
		GregorianCalendar gc = new GregorianCalendar(year, month, 0);
		return gc.get(Calendar.DAY_OF_MONTH);
	}

	/**
	 * 取出指定日期的当月的最大天数
	 */
	public static int getMaxDayInMonth(Date date) {
		return getMaxDayInMonth(date.getYear() + 1900, date.getMonth() + 1);
	}

	/**
	 * 取出指定年月的最大日期, month 起始值为 1
	 */
	public static Date getMaxDateInMonth(int year, int month) {
		GregorianCalendar gc = new GregorianCalendar(year, month, 0);
		return gc.getTime();
	}

	/**
	 * 取出指定日期的当月的最大日期
	 */
	public static Date getMaxDateInMonth(Date date) {
		return getMaxDateInMonth(date.getYear() + 1900, date.getMonth() + 1);
	}

	/**
	 * 取出指定年月的最小日期, month 起始值为 1
	 */
	public static Date getMinDateInMonth(int year, int month) {
		GregorianCalendar gc = new GregorianCalendar(year, month - 1, 1);
		return gc.getTime();
	}

	/**
	 * 取出指定日期的当月的最小日期
	 */
	public static Date getMinDateInMonth(Date date) {
		return getMinDateInMonth(date.getYear() + 1900, date.getMonth() + 1);
	}

	/**
	 * ȡ取一个相差天数值（如0.1458333333333333333333333333333333333307）其中的时分表示数
	 */
	public static String getHhmm(double subDays) {
		Date date = new Date(Math.round(subDays * 24 * 3600 * 1000) - 8 * 3600 * 1000);

		return format(date, "HH:mm");
	}

	/**
	 * 取一个相差毫秒数值其中的时分表示数
	 */
	public static String getHhmm(long subMillis) {
		Date date = new Date(subMillis - 8 * 3600 * 1000);

		return format(date, "HH:mm");
	}

	/**
	 * 取两个时间差毫秒数（time1 - time2）（如取8:30与8:45的差）
	 */
	public static long getTimeSubMillis(String time1, String time2) {
		GregorianCalendar gc1 = new GregorianCalendar(0, 0, 0, Integer.parseInt(time1.split(":")[0]), Integer
				.parseInt(time1.split(":")[1]));
		GregorianCalendar gc2 = new GregorianCalendar(0, 0, 0, Integer.parseInt(time2.split(":")[0]), Integer
				.parseInt(time2.split(":")[1]));

		return gc1.getTimeInMillis() - gc2.getTimeInMillis();
	}

	/**
	 * 取时间差毫秒数（time1 - overtime - time2）
	 */
	public static long getTimeSubMillis(String time1, String overtime, String time2) {
		GregorianCalendar gc = new GregorianCalendar(0, 0, 0);
		GregorianCalendar gc1 = new GregorianCalendar(0, 0, 0, Integer.parseInt(time1.split(":")[0]), Integer
				.parseInt(time1.split(":")[1]));
		GregorianCalendar gcOver = new GregorianCalendar(0, 0, 0, Integer.parseInt(overtime.split(":")[0]), Integer
				.parseInt(overtime.split(":")[1]));
		GregorianCalendar gc2 = new GregorianCalendar(0, 0, 0, Integer.parseInt(time2.split(":")[0]), Integer
				.parseInt(time2.split(":")[1]));

		return gc1.getTimeInMillis() - (gcOver.getTimeInMillis() - gc.getTimeInMillis()) - gc2.getTimeInMillis();
	}

	/**
	 * 取两个时间差分钟数（time1 - time2）（如取8:30与8:45的差）
	 *
	 */
	public static int getTimeSubMinutes(String time1, String time2) {
		return (int) getTimeSubMillis(time1, time2) / 1000 / 60;
	}

	/**
	 * 取时间差分钟数（time1 - overtime - time2）
	 */
	public static int getTimeSubMinutes(String time1, String overtime, String time2) {
		return (int) getTimeSubMillis(time1, overtime, time2) / 1000 / 60;
	}


	/**
	 * 计算date1与date2月数差
	 */
	public static int getMonth(Date s, Date e) {
		if (s.after(e)) {
			Date t = s;
			s = e;
			e = t;
		}
		Calendar start = Calendar.getInstance();
		start.setTime(s);
		Calendar end = Calendar.getInstance();
		end.setTime(e);
		Calendar temp = Calendar.getInstance();
		temp.setTime(e);
		temp.add(Calendar.DATE, 1);

		int y = end.get(Calendar.YEAR) - start.get(Calendar.YEAR);
		int m = end.get(Calendar.MONTH) - start.get(Calendar.MONTH);

		if ((start.get(Calendar.DATE) == 1) && (temp.get(Calendar.DATE) == 1)) {// 前后都不破月
			return y * 12 + m + 1;
		} else if ((start.get(Calendar.DATE) != 1)
				&& (temp.get(Calendar.DATE) == 1)) {// 前破月后不破月
			return y * 12 + m;
		} else if ((start.get(Calendar.DATE) == 1)
				&& (temp.get(Calendar.DATE) != 1)) {// 前不破月后破月
			return y * 12 + m;
		} else {// 前破月后破月
			return (y * 12 + m - 1) < 0 ? 0 : (y * 12 + m - 1);
		}
	}

	/**
	 * 计算date1与date2天数差
	 */
	public static long getDifferenceDays(Date date1,Date date2){
		Calendar cld = Calendar.getInstance();
		Calendar dt = Calendar.getInstance();
		cld.setTime(date1);
		dt.setTime(date2);
		long minus = cld.getTimeInMillis() - dt.getTimeInMillis();
		long days = minus / 1000 / 3600 / 24;
		if (minus % (1000 * 3600 * 24) > 0)
			days++;
		return days;
	}

	/**
	 * 计算date与当前时间的小时差
	 */
	public static long getDifferenceHours(Date date) {
		Calendar cld = Calendar.getInstance();
		Calendar dt = Calendar.getInstance();
		dt.setTime(date);
		long minus = cld.getTimeInMillis() - dt.getTimeInMillis();
		long hours = minus / 1000 / 3600;
		return hours;
	}

	/**
	 * 根据一个日期，返回是星期几的字符串 int hour=c.get(Calendar.DAY_OF_WEEK); hour中存的就是星期几了，其范围
	 * 1~7 1=星期日 7=星期六，其他类推
	 *
	 * @param sdate
	 * @return
	 */
	public static String getWeek(String sdate) {
		// 再转换为时间
		Date date = parse(sdate);
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		// int hour=c.get(Calendar.DAY_OF_WEEK);
		// hour中存的就是星期几了，其范围 1~7
		// 1=星期日 7=星期六，其他类推
		return new SimpleDateFormat("EEEE").format(c.getTime());
	}

	/**
	 * 传入一个时间格式字符串返回该时间是星期几的描述字符串
	 *
	 * @param sdate
	 * @return
	 */
	public static String getWeekStr(String sdate) {
		String str = "";
		str = getWeek(sdate);
		if ("1".equals(str)) {
			str = "星期日";
		} else if ("2".equals(str)) {
			str = "星期一";
		} else if ("3".equals(str)) {
			str = "星期二";
		} else if ("4".equals(str)) {
			str = "星期三";
		} else if ("5".equals(str)) {
			str = "星期四";
		} else if ("6".equals(str)) {
			str = "星期五";
		} else if ("7".equals(str)) {
			str = "星期六";
		}
		return str;
	}

	/**
	 * 获取两个日期(String 型)之间的相差的天数
	 *
	 * @param beginDate	开始日期
	 * @param endDate	结束日期
	 * @return			开始日期与结束日期相差的天数
	 */
	public static long getSubDays(String beginDate, String endDate) {
		if (beginDate == null || beginDate.equals("")) {
			return 0;
		}
		if (endDate == null || endDate.equals("")) {
			return 0;
		}

		return getSubDays(str2Date(beginDate), str2Date(endDate));
	}

	/**
	 * 获取两个日期(Date 型)之间的相差的天数
	 *
	 * @param beginDate	开始日期
	 * @param endDate	结束日期
	 * @return			开始日期与结束日期相差的天数
	 */
	public static long getSubDays(Date beginDate, Date endDate) {
		if (beginDate == null || endDate == null) {
			return 0;
		}

		return (endDate.getTime() - beginDate.getTime()) / (24 * 60 * 60 * 1000);
	}

	/**
	 * 取输入日期的开始日期时间格式 （YYYY-MM-DD 00:00:00）
	 *
	 * @param sDate
	 * @return
	 */
	public static Date getStartTimeOfDay(String sDate) {
		if (sDate == null) {
			return null;
		} else {
			return str2Date(date2Str(str2Date(sDate)) + " 00:00:00", YMD_HMS);
		}
	}

	/**
	 * 取输入日期的结束日期时间格式 （YYYY-MM-DD 23:59:59）
	 *
	 * @param sDate
	 * @return
	 */
	public static Date getEndTimeOfDay(String sDate) {
		if (sDate == null) {
			return null;
		} else {
			return str2Date(date2Str(str2Date(sDate)) + " 23:59:59", YMD_HMS);
		}
	}
	/**
	 * 计算date与当前时间的秒差
	 */
	public static long getDifferenceSeconds(Date date) {
		Calendar cld = Calendar.getInstance();
		Calendar dt = Calendar.getInstance();
		dt.setTime(date);
		long minus = cld.getTimeInMillis() - dt.getTimeInMillis();
		long seconds = minus / 1000;
		return seconds;
	}

	/**
	 * 比较两个日期大小
	 * @param beginDate 开始时间
	 * @param endDate 结束时间
	 * @return 0 相等 ， 1 结束时间大 ,  2 开始时间大
	 */
	public static int compareDate(Date beginDate , Date endDate){
		if (beginDate.getTime() > endDate.getTime()) {
			return LT;
		} else if (beginDate.getTime() < endDate.getTime()) {
			return GT;
		} else {
			return EQ;
		}
	}

	/**
	 * 检查开始时间是否大于结束时间
	 * @param beginDate
	 * @param endDate
	 * @return true | false
	 */
	public static boolean checkBeginGtEnd(Date beginDate , Date endDate){
		int i  = compareDate(beginDate, endDate);
		if(i == LT){
			return true;
		}
		return false;
	}

	/**
	 * 检查开始时间是否大于等于结束时间
	 * @param beginDate
	 * @param endDate
	 * @return
	 */
	public static boolean checkBeginGtEqEnd(Date beginDate , Date endDate){
		int i  = compareDate(beginDate, endDate);
		if(i == LT || i == EQ){
			return true;
		}
		return false;
	}

	/**
	 * 检查开始时间是否大于结束时间
	 * @param beginDate
	 * @param endDate
	 * @param dateFormat
	 * @return
	 * @throws ParseException
	 */
	public static boolean checkBeginGtEnd(String beginDate , String endDate ,String dateFormat) throws ParseException{
		Date dtBeginDate = parse(beginDate, dateFormat);
		Date dtEndDate = parse(endDate, dateFormat);
		return checkBeginGtEnd(dtBeginDate,dtEndDate);
	}

	/**
	 * 检查开始时间是否大于等于结束时间
	 * @param beginDate
	 * @param endDate
	 * @param dateFormat
	 * @return
	 * @throws ParseException
	 */
	public static boolean checkBeginGtEqEnd(String beginDate , String endDate ,String dateFormat) throws ParseException{
		Date dtBeginDate = parse(beginDate, dateFormat);
		Date dtEndDate = parse(endDate, dateFormat);
		return checkBeginGtEqEnd(dtBeginDate,dtEndDate);
	}

	/**
	 * 检查开始时间是否等于结束时间
	 * @param beginDate
	 * @param endDate
	 * @return true | false
	 */
	public static boolean checkBeginEqEnd(Date beginDate , Date endDate){
		int i  = compareDate(beginDate, endDate);
		if(i == EQ){
			return true;
		}
		return false;
	}

	/**
	 * 检查开始时间是否等于结束时间
	 * @param beginDate
	 * @param endDate
	 * @param dateFormat
	 * @return
	 * @throws ParseException
	 */
	public static boolean checkBeginEqEnd (String beginDate , String endDate ,String dateFormat) throws ParseException{
		Date dtBeginDate = parse(beginDate, dateFormat);
		Date dtEndDate = parse(endDate, dateFormat);
		return checkBeginEqEnd(dtBeginDate,dtEndDate);
	}

	/**
	 * 获取最大的时间
	 * @param dates
	 * @return
	 */
	public static Date getMaxDate(List<Date> dates) {
		Date maxDate = null;
		for (Date date : dates) {
			if (date != null) {
				if (maxDate == null) {
					maxDate = date;
					continue;
				}
				if (!checkBeginGtEnd(maxDate, date)) {
					maxDate = date;
				}
			}
		}
		return maxDate;
	}

	/**
	 * main方法，测试本类中函数用
	 *
	 * @param args 参数
	 */
	public static void main(String[] args) {
		try {
			System.out.println(DateUtils.getWeekBegin("2013-12-15"));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
