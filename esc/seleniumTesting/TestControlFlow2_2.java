package seleniumTesting;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;


public class TestControlFlow2_2 {
	
public static void main(String[] args) throws InterruptedException {		
		
		startTestFlow2_2();
		
		
	}

public static void startTestFlow2_2() throws InterruptedException{
	System.out.println("Testing control flow 2.2");

	System.setProperty("webdriver.chrome.driver","C:\\Users\\akmal\\Downloads\\chromedriver_win32\\chromedriver.exe"); //change path
	//
	WebDriver driver = new ChromeDriver();
	driver.get("http://localhost:3000/");
	WebElement chatButton = driver.findElement(By.id("support_image"));
	chatButton.click();
	Thread.sleep(3000);
	System.out.println("finding all buttons");
	List<WebElement> allClassSameType = driver.findElements(By.className("botui-actions-buttons-button"));
	allClassSameType.get(0).click();
	Thread.sleep(3000);
	allClassSameType = driver.findElements(By.className("botui-actions-buttons-button"));
	allClassSameType.get(1).click();  // 0 1 or 2
//	System.out.println("success");
//	Thread.sleep(20000);
	//
	WebDriver driver2 = new ChromeDriver();
	driver2.get("http://localhost:3000/");
	WebElement chatButton2 = driver2.findElement(By.id("support_image"));
	chatButton2.click();
	Thread.sleep(3000);
	System.out.println("finding all buttons");
	List<WebElement> allClassSameType2 = driver2.findElements(By.className("botui-actions-buttons-button"));
	allClassSameType2.get(0).click();
	Thread.sleep(3000);
	allClassSameType2 = driver2.findElements(By.className("botui-actions-buttons-button"));
	allClassSameType2.get(1).click();  // 0 1 or 2
	Thread.sleep(15000);
	
	driver.close();
	System.out.println("success");



}

}
