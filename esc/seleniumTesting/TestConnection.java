import java.util.Random;

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

public class TestConnection {
		
	public static void main(String[] args) throws InterruptedException {		
		
		connect();
		
	}
	
	public static void connect() throws InterruptedException{
		System.setProperty("webdriver.chrome.driver","C:\\Users\\akmal\\Downloads\\chromedriver_win32\\chromedriver.exe"); //change path
		//
		WebDriver driver = new ChromeDriver();
	
		driver.get("http://localhost:3000/");
	
		WebElement chatButton = driver.findElement(By.id("support_image"));
		
		Thread.sleep(3000);
		
		chatButton.click();
		
		WebElement yesButton = driver.findElement(By.className("botui-actions-buttons-button"));
		
		yesButton.click();
		
		Thread.sleep(3000);
		
		WebElement uPhoneButton = driver.findElement(By.className("botui-actions-buttons-button"));
		
		uPhoneButton.click();
		
		Thread.sleep(20000); //loading textBox takes 12 seconds
		
		
		

	}
	
}
